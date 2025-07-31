export interface IResponse<T> {
    data: T;
    status_code: number;
    message: string | string[];
}

export interface IResponsePagination<T> {
    data: T[];
    total_elements: number;
    total_pages: number;
    page_size: number;
    current_page: number;
    from: number;
    to: number;
    status_code: number;
    message: string;
}

export interface IPrismaFindOptions<T> {
    where?: T;
    orderBy?: any;
    skip?: number;
    take?: number;
    include?: any;
    select?: any;
}
