
import { mainModule } from 'process';
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'users',
})
export class User extends Model {

  @Column
  public email: string;
  @Column
  public name: string;
  @Column
  public token: string;
  @Column
  public friends: string;
  @Column
  public saved: string;
}




