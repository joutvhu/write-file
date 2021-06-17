# Write File

GitHub Action to write file.

## Usage

See [action.yml](action.yml)

## Inputs

- `path` **Required** The path to the file to write.

- `contents` **Required** The contents of the file.

- `write_mode` **Optional** The mode of writing to use: `overwrite`, `append`, or `preserve`.
  - `overwrite` - overwrite the file if it exists
  - `append` - if the file exists, it will be appended to
  - `preserve` - if the file already exists the contents will not be written to

- `encoding`  **Optional** Encoding of the contents.

## Example

```yaml
steps:
  - uses: joutvhu/write-file@v1
    with:
      path: secret-key.gpg
      contents: ${{ secrets.GPG_SECRET_KEY }}
      write_mode: overwrite
      encoding: base64
```
