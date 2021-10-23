import { AnitaUniversalDataStorage } from '@anita/client/data/model/project-info';
import { DbObjects } from '@anita/client/libs/db-connector/models/executers';
import { DbDeletor } from './db-deletor/db-deletor.class';
import { DbInsertor } from './db-insertor/db-insertor.class';
import { DbSelector } from './db-selector/db-selector.class';
import { DbStore } from './db-store/dbstore.class';
import { DbUpdator } from './db-updator/db-updator.class';

/**
 * Constant to be passed to DbInit to use MySql as plugin
 */
export const FILE_HANDLES_PLUGIN: DbObjects<any, AnitaUniversalDataStorage> = {
  insertor: DbInsertor,
  selector: DbSelector,
  updator: DbUpdator,
  deletor: DbDeletor,
  dbStore: DbStore
};
