export type Guitar = {
    id: number;
    name: string;
    vendorCode: string;
    type: string;
    description: string;
    previewImg: string;
    stringCount: number;
    rating: number;
    price: number;
    comments?: Comments
}

export type Guitars = Guitar []

export type Comment = {
    id: string;
    userName: string;
    advantage: string;
    disadvantage: string;
    comment: string;
    rating: number;
    createAt: string | Date;
    guitarId: number;
}

export type Comments = Comment []

export type NewComment = {
    guitarId: number,
    userName: string,
    advantage: string,
    disadvantage: string,
    comment: string,
    rating: number,
}
