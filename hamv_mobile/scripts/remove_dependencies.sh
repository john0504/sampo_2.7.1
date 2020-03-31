jq 'del(.cordova.plugins["cordova-plugin-firebasex"])' < package.json > tmp.json
jq 'del(.dependencies["cordova-plugin-firebasex"])' < tmp.json > package.json
rm tmp.json
