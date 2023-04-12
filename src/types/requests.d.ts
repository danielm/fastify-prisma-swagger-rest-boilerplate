interface IPaginatorRequest {
  Querystring: { take: number; from?: string; }
}

interface ISingleRequest extends IPaginatorRequest {
  Params: {
    id: string;
  };
}

/*
* Category Model CRUD
*/
interface IPostCategory {
  Body: {
    name: string;
  }
}

interface IPutCategory extends IPostCategory {
  Params: {
    id: string;
  };
}

