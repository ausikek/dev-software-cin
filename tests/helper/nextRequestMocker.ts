import { NextRequest, NextResponse } from 'next/server';

/**
 * @param header
 * Headers da requisicao
 * @param payload
 * JSON com o corpo da requisicao
 * @param slug
 * Slug da requisicao
 * @example
 * const options = {
 *  header: {
 *   "content-type": "application/json",
 *   "authorization" : "Bearer token"
 *  },
 *  payload: {
 *   name: "John Doe",
 *   email: "john@doe.com",
 *  },
 *  slug: "123"
 * }
 *
 */
type MockNextRequestOptions = Omit<Partial<NextRequest>, 'headers, body'> & {
  header?: {
    [key: string]: string;
  };
  payload?: object;
  slug?: string;
};

class NextRequestMock {
  /**
   * Utilizado para mockar o objeto de requisicao do Next.js
   * @param options
   * @returns
   */
  private mockNextRequest = (
    options: MockNextRequestOptions = {}
  ): NextRequest => {
    const defaultHeaders = new Headers(
      options.header
        ? { 'content-type': 'application/json', ...options.header }
        : { 'content-type': 'application/json' }
    );

    const defaultRequest: Partial<NextRequest> = {
      method: 'GET',
      url: '/',
      headers: defaultHeaders,
      json: jest.fn().mockResolvedValue({ ...options.payload }),
      ...options,
    };

    return defaultRequest as NextRequest;
  };

  /**
   * Utilizado para executar uma requisição GET
   * @param fn
   * @param options
   * @returns
   */
  public async get(
    fn: (req: NextRequest) => Promise<NextResponse<unknown>>,
    options?: MockNextRequestOptions
  ): Promise<NextResponse<unknown>> {
    const mockedRequest = this.mockNextRequest(options);

    return await fn(mockedRequest);
  }

  /**
   * Utilizado para executar uma requisição GET com parâmetros na URL
   * @param fn
   * @param options
   * @returns
   */
  public async getWithParams(
    fn: (
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) => Promise<NextResponse<unknown>>,
    options?: MockNextRequestOptions
  ): Promise<NextResponse<unknown>> {
    const mockedRequest = this.mockNextRequest(options);
    if (options?.slug) {
      const param = Promise.resolve({ id: options?.slug });

      return await fn(mockedRequest, { params: param });
    }

    return await fn(mockedRequest, { params: Promise.resolve({ id: '' }) });
  }

  /**
   * Utilizado para executar uma requisição POST
   * @param fn
   * @param options
   * @returns
   */
  public async post(
    fn: (req: NextRequest) => Promise<NextResponse<unknown>>,
    options?: MockNextRequestOptions
  ): Promise<NextResponse<unknown>> {
    const mockedRequest = this.mockNextRequest({
      method: 'POST',
      ...options,
    });

    return await fn(mockedRequest);
  }

  /**
   * Utilizado para executar uma requisição PUT
   * @param fn
   * @param options
   * @returns
   */
  public async put(
    fn: (
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) => Promise<NextResponse<unknown>>,
    options?: MockNextRequestOptions
  ): Promise<NextResponse<unknown>> {
    const mockedRequest = this.mockNextRequest({
      method: 'PUT',
      ...options,
    });
    if (options?.slug) {
      const param = Promise.resolve({ id: options?.slug });

      return await fn(mockedRequest, { params: param });
    }

    return await fn(mockedRequest, { params: Promise.resolve({ id: '' }) });
  }

  /**
   * Utilizado para executar uma requisição PATCH
   * @param fn
   * @param options
   * @returns
   */
  public async patch(
    fn: (
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) => Promise<NextResponse<unknown>>,
    options?: MockNextRequestOptions
  ): Promise<NextResponse<unknown>> {
    const mockedRequest = this.mockNextRequest({
      method: 'PATCH',
      ...options,
    });
    if (options?.slug) {
      const param = Promise.resolve({ id: options?.slug });

      return await fn(mockedRequest, { params: param });
    }

    return await fn(mockedRequest, { params: Promise.resolve({ id: '' }) });
  }

  /**
   * Utilizado para executar uma requisição DELETE
   * @param fn
   * @param options
   * @returns
   */
  public async delete(
    fn: (
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) => Promise<NextResponse<unknown>>,
    options?: MockNextRequestOptions
  ): Promise<NextResponse<unknown>> {
    const mockedRequest = this.mockNextRequest({
      method: 'DELETE',
      ...options,
    });

    if (options?.slug) {
      const param = Promise.resolve({ id: options?.slug });

      return await fn(mockedRequest, { params: param });
    }

    return await fn(mockedRequest, { params: Promise.resolve({ id: '' }) });
  }
}

export { NextRequestMock };
