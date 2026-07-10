$headers = @{
    "Authorization" = "Bearer skzlnGYUPti3cI8dSj4AOtd0ce22lwKbLqnMwS6npZB406GXJT8QuLUpLRrstIV0iDGykjBFBVSuRCKOE2MevTucmP9DkxP4XWSLQachkWAjR5DGSgtg3zMQHQCwmwVstjrMnsSysMEyNpuY6Zh5nNgvKyBS04Rexx1xj0fWXTrAFFLqJVyW"
}

$query = "array::unique(*._type)"
$encoded = [uri]::EscapeDataString($query)
$url = "https://2atqkk07.api.sanity.io/v2023-01-01/data/query/production?query=$encoded"

$response = Invoke-RestMethod -Uri $url -Headers $headers
$response.result | ConvertTo-Json -Depth 10 | Out-File "sanity-types.json"

$query2 = "*[_type in array::unique(*._type)] | order(_createdAt desc) [0...50]"
$encoded2 = [uri]::EscapeDataString($query2)
$url2 = "https://2atqkk07.api.sanity.io/v2023-01-01/data/query/production?query=$encoded2"

$response2 = Invoke-RestMethod -Uri $url2 -Headers $headers
$response2.result | ConvertTo-Json -Depth 10 | Out-File "sanity-data.json"
