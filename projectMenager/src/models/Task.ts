export interface Task{
    id:string
    name:string
    description:string
    priority:'low'|'medium'|'high'
    storyId:string
    estimatedTime:number
    status:'todo'|'doing'|'done'
    createdAt:string
    startAt?:string
    endAt?:string
    assignedUserId?:string
    

}