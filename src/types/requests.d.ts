interface IPaginatorRequest {
  Querystring: { take: number; from?: string; }
}

interface ISingleRequest extends IPaginatorRequest {
  Params: {
    id: string;
  };
}

