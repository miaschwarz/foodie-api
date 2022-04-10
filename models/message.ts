
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'messages',
})
export class Message extends Model {

  @Column
  public fid: string;
  @Column
  public mid: string;
  @Column
  public irt: string;
  @Column
  public tid: string;
  @Column
  public email: string;
  @Column
  public formatted_email: string;
  @Column
  public state: string;
  @Column
  public subject: string;
  @Column
  public snippet: string;
  @Column
  public text: string;
  @Column
  public internalDate: number;

}

