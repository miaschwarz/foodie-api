import { Table, Column, Model } from 'sequelize-typescript'

@Table({
    tableName: 'reviews',
})
export class Review extends Model {

    @Column
    public restaurant_id: number;
    @Column
    public user_id: number;
    @Column
    public review: string;
    @Column
    public rating: number;

}




