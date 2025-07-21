vcl 4.1;

backend default {
    .host = "app";
    .port = "3000";
}

sub vcl_recv {
    if (req.method == "PURGE") {
        if (req.http.X-Purge-Token != "mysecrettoken123") {
            return (synth(403, "Forbidden"));
        }
        return (purge);
    }

    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }

    if (req.url ~ "^/product/") {
        return (hash);
    }

    return (pass);
}

sub vcl_backend_response {
    if (bereq.url ~ "^/product/") {
        set beresp.ttl = 5m;
    }
}