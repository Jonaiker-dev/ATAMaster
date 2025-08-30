export interface StorageItems {
    name:             string;
    id:               string;
    updated_at:       Date;
    created_at:       Date;
    last_accessed_at: Date;
    metadata:         Metadata;
}

export interface Metadata {
    eTag:           string;
    size:           number;
    mimetype:       string;
    cacheControl:   string;
    lastModified:   Date;
    contentLength:  number;
    httpStatusCode: number;
}
