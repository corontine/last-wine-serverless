export const BuildResponse = (statusCode: number, body: any) => {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: safeJSONStringify(body)
    };
};

const safeJSONStringify = (objectToStringify: any) => {
    return JSON.stringify(objectToStringify, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    );
};

