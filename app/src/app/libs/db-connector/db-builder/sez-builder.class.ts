import { DEFAULT_OWNER_IDENTIFIER, DEFAULT_PARENTS_IDENTIFIER, DEFAULT_PK } from '@anita/client/libs/db-connector/db-builder/default-values.constant';
import { SectionDefinition, SectionModel, SectionName } from '@anita/client/libs/db-connector/db-builder/sez-definition';
import { Logger } from '@anita/client/libs/logger/logger.class';

type Relations = 'childOf' | 'parentOf';

/**
 * Builds a Section model
 */
export class SezBuilder<T> {

  /**
   * The section model
   */
  private section: SectionModel<T>;

  /**
   * Creates an instance of sez builder.
   * @param allSez all the sections definitions of the data structure.
   * @param name the section name to build.
   * @param [fields] all fields. Optional as a section can have only the system fields.
   * @param [pk] the primary key.
   * @param [indexes] the indexes of the section (aka table).
   * @param [orderBy] default sorting order.
   * @param [childOf] list of sections of which the current section is child. Needed for the UI, to add the parent delector.
   * @param [parentOf] list of sections of which the current section is parent. Needed for the UI, to display child items.
   * @param [parentsIdentifiers] name of the field identifying the parent id value.
   * @param [ownerIdentifier] name of the field identifying the id of the owner.
   */
  constructor(
    private allSez: Array<SectionDefinition<any>>,
    private name: SectionName,
    private fields: Array<keyof T> = [],
    private pk: keyof T & string = DEFAULT_PK as keyof T & string,
    private indexes: Array<keyof T> = [DEFAULT_PK] as Array<keyof T>,
    private orderBy: keyof T & string = DEFAULT_PK as keyof T & string,
    private childOf?: Array<SectionName>,
    private parentOf?: Array<SectionName>,
    private parentsIdentifiers?: keyof T,
    private ownerIdentifier?: keyof T
  ) { }

  /**
   * Makes the section and returns it.
   */
  public make(): SectionModel<T> {
    this.addPkToFields();
    this.addPkToIndexes();
    this.addSpecialFieldsToFields('indexes');
    this.setOwnerIdentifier();
    this.checkOrderByExists();
    this.checkRelations();
    this.checkParentIdentifier();
    this.buildSez();
    return this.section;
  }

  /**
   * Adds the pk field name to fields if not already included.
   */
  private addPkToFields(): void {
    if (!this.fields.includes(this.pk))
      this.fields.unshift(this.pk);
  }

  /**
   * Adds the pk field name to indexes if not already included.
   */
  private addPkToIndexes(): void {
    if (!this.indexes.includes(this.pk))
      this.indexes.unshift(this.pk);
  }

  /**
   * Adds the fields specified in `indexes` to the fields, if not already included.
   */
  private addSpecialFieldsToFields(scope: 'indexes'): void {
    this[scope].forEach(fieldName => {
      if (!this.fields.includes(fieldName))
        this.fields.push(fieldName);
    });
  }

  /**
   * Sets the owneridentifier value and adds it to the fields if not already included.
   */
  private setOwnerIdentifier(): void {
    if (!this.ownerIdentifier)
      this.ownerIdentifier = DEFAULT_OWNER_IDENTIFIER as keyof T;
    if (!this.fields.includes(this.ownerIdentifier))
      this.fields.push(this.ownerIdentifier);
  }

  /**
   * Adds the orderBy value to fields if not already included.
   */
  private checkOrderByExists(): void {
    if (!this.fields.includes(this.orderBy))
      this.fields.push(this.orderBy);
  }

  /**
   * Checks that the values of `parentOf` and `childOf` correspond to valid section names.
   */
  private checkRelations(): void {
    if (this.parentOf)
      this.loopAllRelations('parentOf');
    if (this.childOf)
      this.loopAllRelations('childOf');
  }

  /**
   * Loops all relations for a given scope and calls checkRelationsExist to check if the value is valid.
   * Sets the scope to undefined if there are no valid relationships.
   * @param scope either `childOf` or `parentOf`
   *
   * @see checkRelationsExist
   */
  private loopAllRelations(scope: Relations): void {
    this[scope].forEach((sezName: SectionName) => this.checkRelationsExist(sezName, scope));
    if (!this[scope].length)
      this[scope] = undefined;
  }

  /**
   * Checks that the section name found in `childOf` or `parentOf` correponds to an actual section.
   * If not, removes the section name from the list of sections in `childOf` or `parentOf`.
   * @param sezName the name of the section to look for
   * @param scope either `childOf` or `parentOf`
   */
  private checkRelationsExist(sezName: SectionName, scope: Relations): void {
    const indexSez = this.getSezByName(sezName);
    if (indexSez >= 0)
      return;

    const indexInScope = this[scope].indexOf(sezName as string);
    this[scope].splice(indexInScope, 1);

    Logger.error(`Error in '${scope}' list`, `Section '${sezName}' does not exist in the sections list and has hence been removed from the '${scope}' list`);
  }

  /**
   * Finds the section number by its name from the list of all the section definitions.
   * @param sezName the name to look for
   * @returns the section number
   */
  private getSezByName(sezName: SectionName): number {
    let foundIndex = -1;
    let counter = 0;
    const length = this.allSez.length;
    while (foundIndex === -1 && counter < length) {
      if (this.allSez[counter].name === sezName)
        foundIndex = counter;
      counter++;
    }
    return foundIndex;
  }

  /**
   * Checks that parentsIdentifiers is set if `childOf` has any section.
   */
  private checkParentIdentifier(): void {
    if (this.childOf && !this.parentsIdentifiers)
      this.parentsIdentifiers = DEFAULT_PARENTS_IDENTIFIER as keyof T;
  }

  /**
   * Builds the section
   */
  private buildSez(): void {
    this.section = {
      name: this.name,
      pk: this.pk,
      indexes: this.indexes,
      orderBy: this.orderBy,
      fields: this.fields,
      ownerIdentifier: this.ownerIdentifier
    };
    this.addParentOf();
    this.addChildOf();
  }

  /**
   * Adds the filed `parentOf` if any
   */
  private addParentOf(): void {
    if (this.parentOf)
      this.section.parentOf = this.parentOf;
  }

  /**
   * Adds the filed `childOf` if any
   */
  private addChildOf(): void {
    if (!this.childOf)
      return;

    this.section.childOf = this.childOf;
    this.section.parentsIdentifiers = this.parentsIdentifiers;
  }

}
