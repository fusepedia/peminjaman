$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server started on http://localhost:8080"

while ($true) {
    $context = $listener.GetContext()
    $url = $context.Request.Url.LocalPath
    if ($url -eq "/") { $url = "/index.html" }
    
    $basePath = "C:\Users\Charonoa\.gemini\antigravity\scratch\peminjaman"
    $filePath = Join-Path $basePath ($url.TrimStart("/").Replace("/", "\"))
    
    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath)
        
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".json" { "application/json" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".svg"  { "image/svg+xml" }
            ".ico"  { "image/x-icon" }
            default { "application/octet-stream" }
        }
        
        $context.Response.ContentType = $contentType
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $context.Response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $url")
        $context.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    
    $context.Response.Close()
    Write-Host "$([DateTime]::Now.ToString('HH:mm:ss')) $($context.Request.HttpMethod) $url"
}
