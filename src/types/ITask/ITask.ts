import { ETaskStatus } from "./../../enums/ETaskStatus/ETaskStatus";

export interface ITask{
    id: number;
    description: string;
    assigneeId: number;
    status: ETaskStatus;
    priority: number;
}