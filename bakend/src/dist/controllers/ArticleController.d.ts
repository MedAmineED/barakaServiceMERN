import { Request, Response } from 'express';
export declare const createArticle: (req: Request, res: Response) => Promise<void>;
export declare const getAllArticles: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getArticleById: (req: Request, res: Response) => Promise<void>;
export declare const updateArticle: (req: Request, res: Response) => Promise<void>;
export declare const deleteArticle: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=ArticleController.d.ts.map