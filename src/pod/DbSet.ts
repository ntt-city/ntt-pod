import { Model, Sequelize } from 'sequelize-typescript';
import { SimpleObject } from '@um/typings';

export interface Column {
    name: string;
}

export type ColumnFor<T extends SimpleObject, K extends keyof T> = {
    [key in K]: boolean | string | Column
};

export interface ModelMap<T extends SimpleObject, K extends keyof T> {
    columns: ColumnFor<T, K>;
    model: typeof Model;
}

export class DbSet<T extends SimpleObject> {
    constructor(public sequelize: Sequelize) {
    }

    public addModel<K extends keyof T>(model: typeof Model, columns: ColumnFor<T, K>) {
        this.sequelize.addModels([model]);
        return this;
    }
}

export function dbSet<T extends SimpleObject>(sequelize: Sequelize) {
    return new DbSet<T>(sequelize);
}
