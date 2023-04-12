/*
* Some types used mostly to extract data from:
* - Request parameters
* - POST body
* - Query string
*/

type CrudAllRequest = {
  Querystring: {
    take: number;
    from?: string;
  }
}

type CrudIdRequest = {
  Params: {
    id: string;
  }
};

type PostCategory = {
  Body: {
    name: string;
  }
}

type PutCategory = {
  Body: {
    name: string;
  }
  Params: {
    id: string;
  }
}

type PostProduct = {
  Body: {
    name: string;
    published: boolean;
    price: number;
    categoryId: string;
  }
}

type PutProduct = {
  Body: {
    name: string;
    published: boolean;
    price: number;
    categoryId: string;
  }
  Params: {
    id: string;
  }
}
