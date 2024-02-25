export enum MethodEnum {
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export enum RoutesEnum {
  CREDENTIAL = 'credential',
}

export enum ControllersTaskOrLeadEnum {
  CHECKLIST = 'checklist',
  CHECKLIST_ITEM = 'checklist-item',
  TASK_LEAD = 'task-lead',
}

export enum ControllersLeadEnum {
  PERSON = 'person',
  PERSON_RELATIONSHIP = 'person-relationship',
  PERSON_FIELD = 'person-field',
  PERSON_ADDRESS = 'person-address',
  LEAD = 'lead',
  LEAD_FILE = 'lead-file',
  LEAD_NOTE = 'lead-note',
  LEAD_OPORTUNITY = 'lead-oportunity',
  LEAD_PRODUCT_SERVICE = 'lead-product-service',
  LEAD_PRODUCT_SERVICE_FIELD = 'lead-product-service-field',
  LEAD_RESPONSIBLE = 'lead-responsible',
  TAG_LEAD = 'tag-lead',
}

export enum ControllersTaskGuardTeamEnum {
  TASK = 'task',
  TASK_CATEGORY_LINK = 'task-category-link',
  TASK_MEDIA = 'task-media',
  TASK_REPLY = 'task-reply',
  TAG_TASK = 'tag-task',
  TASK_RESPONSIBLE = 'task-responsible',
}

export enum ControllersTaskGuardCategoryEnum {
  TASK = 'task',
  TASK_RESPONSIBLE = 'task-responsible',
}

export enum ParamsEnum {
  ID = 'id',
  TASK_ID = 'task_id',
  LEAD_ID = 'lead_id',
}

export enum TaskCategoryCodeEnum {
  TASK_CHANGE_PRIORITY = 'task-change-priority',
  TASK_CHANGE_START_DATE = 'task-change-start-date',
  TASK_CHANGE_END_DATE = 'task-change-end-date',
  TASK_CREATE_RESPONSIBLE = 'task-create-responsible',
  TASK_CREATE_RESPONSIBLE_USER = 'task-create-responsible-user',
  TASK_CREATE_RESPONSIBLE_TEAM = 'task-create-responsible-team',
  TASK_CREATE_RESPONSIBLE_TAKE_ON = 'task-create-responsible-take-on',
  TASK_REMOVE_RESPONSIBLE = 'task-remove-responsible',
}
