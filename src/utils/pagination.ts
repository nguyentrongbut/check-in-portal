export async function getPaginatedResult<
    T,
    P extends Record<string, unknown> = Record<string, unknown>
>(
    rawSearchParams:
        | Promise<Record<string, string | undefined>>
        | Record<string, string | undefined>,
    fetcher: (
        page: number,
        size: number,
        extra?: P
    ) => Promise<{ items: T[]; total: number }>
) {
    const searchParams = await rawSearchParams;

    const currentPage = parseInt(searchParams.page || "0", 10);
    const pageSize = parseInt(searchParams.size || "10", 10);

    const {page, size, ...extraParams} = searchParams;
    const extra = extraParams as P;

    const {items, total} = await fetcher(currentPage, pageSize, extra);
    const totalPages = Math.ceil(total / pageSize);

    return {
        currentPage,
        pageSize,
        items,
        total,
        totalPages,
    };
}
