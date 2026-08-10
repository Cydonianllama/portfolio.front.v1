/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface WidgetDTO {
  id: string
  name: string
  creationDate: string
  isDark: boolean
  UIconfig: {
    title: string
    allowFiles: boolean
    allowEmojis: boolean
  }
  conversationalConfig: {
    firstMessageResponse: {
      message: string
    }
  }
}

// request

export interface GetWidgetsRequestDTO {
  query: string;
  page: number;
  workspaceId: string
}

export interface CreateWidgetRequestDTO {
  name: string;
  workspaceId: string;
  isDark?: boolean;
  UIconfig?: {
    title?: string;
    allowFiles?: boolean;
    allowEmojis?: boolean;
  };
  conversationalConfig?: {
    firstMessageResponse?: {
      message?: string;
    };
  };
}

export interface UpdateWidgetRequestDTO {
  id: string;
  name?: string;
  isDark?: boolean;
  UIconfig?: {
    title?: string;
    allowFiles?: boolean;
    allowEmojis?: boolean;
  };
  conversationalConfig?: {
    firstMessageResponse?: {
      message?: string;
    };
  };
}

export interface DeleteWidgetRequestDTO {
  id: string;
}

// response

export interface GetWidgetResponseDTO {
  widget: WidgetDTO | null
}

export interface GetWidgetsResponseDTO {
  list: Array<WidgetDTO>
}

export interface CreateWidgetResponseDTO {
  widget: WidgetDTO | null
}

export interface UpdateWidgetResponseDTO {
  widget: WidgetDTO | null
}

export interface DeleteWidgetResponseDTO {
  id: string
}
