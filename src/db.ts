import {Pool} from 'pg';

const connectionString = 'postgres://kofpkefv:rOTjufKh_WQZrBbIapgFb9Wc4ZftPFPg@kesavan.db.elephantsql.com/kofpkefv';

const db = new Pool({ connectionString });

export default db;