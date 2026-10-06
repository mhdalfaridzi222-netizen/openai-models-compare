import json

def sql_str(val):
    if val is None:
        return 'NULL'
    s = str(val).replace("'", "''")
    return f"'{s}'"

def sql_num(val):
    if val is None:
        return 'NULL'
    return str(val)

def sql_bool(val):
    return 'TRUE' if val else 'FALSE'

def sql_arr(val):
    if not val:
        return "ARRAY[]::TEXT[]"
    items = []
    for x in val:
        clean = str(x).replace("'", "''")
        items.append(f"'{clean}'")
    return f"ARRAY[{', '.join(items)}]::TEXT[]"

print("Helper ready")
