import { ETaskStatus } from "./../../enums/ETaskStatus/ETaskStatus";

export interface ITask{
id: number;
title:string;
description: string;
assigneeId: number;
status: ETaskStatus;
priority: number;
}