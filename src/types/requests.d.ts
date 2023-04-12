/*
* Some types used mostly to extract data from:
* - Request parameters
* - POST body
* - Query string
*/

// VOY: convertir en types!!

// interface IPaginatorRequest {
type PaginatorRequest = {
  // Querystring: { take: number; from?: string; }
  take: number;
  from?: string;
}

// interface ISingleRequest extends IPaginatorRequest {
type IdParamRequest = {
  // Params: {
  id: string;
}

/*
 * single ==> Params: IdParamRequest, Querystring: PaginatorRequest
 */

type PostCategory = {
  Body: {
    name: string;
  }
}

/*
 * IPostCategory ==> Body: PostCategoryBody
 */

// interface IPutCategory extends IPostCategory {
type PutCategory = {
  Body: {
    name: string;
  }
  Params: {
    id: string;
  }
}

