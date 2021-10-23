import { AbstractModel } from '@anita/client/libs/db-connector/constants/ds.constant';
import { DbConnectorInstance, Deletor } from '@anita/client/libs/db-connector/models/executers';
import { ChildDeletor } from '@anita/client/libs/db-connector/plugins/indexed-db/db-deletor/child-deletor.class';
import { QueryMaker } from '@anita/client/libs/db-connector/plugins/indexed-db/query-makers/query-maker.class';
import { Logger } from '@anita/client/libs/logger/logger.class';
import Dexie from 'dexie';

/**
 * Implements the deletor for IndexedDB
 */
export class DbDeletor<E> implements Deletor<E> {

  /**
   * Whether to delte childe elements or not.
   */
  private deleteChilds = false;

  /**
   * Creates an instance of db deletor.
   * @param section the section of the element to delete
   * @param args the arguments for the query, must include the primary key (`pk`) value
   */
  constructor(
    private dbConnector: DbConnectorInstance<Dexie>,
    private section: keyof AbstractModel,
    private args: Partial<E>
  ) { }

  /**
   * Toggles `deleteChilds`
   */
  public setDeleteChilds(): DbDeletor<E> {
    this.deleteChilds = !this.deleteChilds;
    return this;
  }

  /**
   * Perform the delete action on the given element.
   */
  public async autoDelete(): Promise<void> {
    if (this.args[this.dbConnector.DS[this.section].pk]) {
      const aliasElementToDelete = this.args[this.dbConnector.DS[this.section].pk];
      await new QueryMaker(this.dbConnector, this.section)
        .addWhere([this.dbConnector.DS[this.section].pk as string, '=', aliasElementToDelete])
        .delete();

      if (this.deleteChilds)
        await this.seekAndDestroyChilds(aliasElementToDelete);
    } else
      Logger.error('Error in autoDelete', 'No PK value was found on the element');
  }

  /**
   * If `deleteChilds` is true, loops over all child sections and calls ChildDeletor.
   *
   * @see ChildDeletor
   */
  private async seekAndDestroyChilds(aliasElementToDelete: string): Promise<void> {
    if (!this.dbConnector.DS[this.section].parentOf)
      return;
    const childsDestroyers = [];
    this.dbConnector.DS[this.section].parentOf.forEach((childSez: keyof AbstractModel) =>
      childsDestroyers.push(new ChildDeletor(this.dbConnector, aliasElementToDelete, childSez).do())
    );
    await Promise.all(childsDestroyers);
  }

}
