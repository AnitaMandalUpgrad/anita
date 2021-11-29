import { dbInstances } from 'app/data/local-dbs/db-instances.const';
import { LOCAL_STORAGE_SYSTEMS } from 'app/data/local-dbs/local-storage-systems.enum';
import { LocalProjectSettings, Section } from 'app/data/project-structure/project-info';
import { DataStructureExtender } from 'app/data/system-local-db/data-structure-extender.class';
import { DbConnector } from 'app/libs/db-connector/db-connector.class';
import { FILE_HANDLES_PLUGIN } from 'app/libs/db-connector/plugins/file-handles/exporter.constant';
import { FileSystemFileHandle } from 'app/libs/db-connector/plugins/file-handles/helpers/file-system-access-api';
import { INDEXEDDB_PLUGIN } from 'app/libs/db-connector/plugins/indexed-db/exporter.constant';

export class DbInitializer {

  private projectId: string;

  constructor(
    private projectInfo: LocalProjectSettings,
    private projectSections?: Array<Section>,
    private fileHandle?: FileSystemFileHandle

  ) {
    this.projectId = projectInfo.id;
  }

  public async init(): Promise<void> {
    if (this.projectInfo.localStorage === LOCAL_STORAGE_SYSTEMS.fileSystem)
      await this.doFileSystem();
    else
      await this.doIndexedDb();
  }

  private async doFileSystem(): Promise<void> {
    if (this.fileHandle)
      this.projectInfo = { ...this.projectInfo, fileHandle: this.fileHandle };
    dbInstances[this.projectId] = await new DbConnector(FILE_HANDLES_PLUGIN, { projectInfo: this.projectInfo }).init();
  }

  private async doIndexedDb(): Promise<void> {
    if (this.projectSections) {
      const dsExpander = new DataStructureExtender(this.projectSections);
      dsExpander.extend();
      dbInstances[this.projectId] = await new DbConnector(
        INDEXEDDB_PLUGIN,
        { previousVersions: [], indexedDbName: this.projectId },
        dsExpander.allSez
      ).init();
    } else if (this.projectInfo.dexieInfoForUpgrade) {
      dbInstances[this.projectId] = await new DbConnector(
        INDEXEDDB_PLUGIN,
        {
          previousVersions: this.projectInfo.dexieInfoForUpgrade.previousVersions,
          DS: this.projectInfo.dexieInfoForUpgrade.DS,
          indexedDbName: this.projectId
        }
      ).init();
    }
  }

}
