./scripts/apply_env_script.sh
npm rm app-engine
npm i
npm i app-engine.tgz

npm install cordova-set-version
tag=`git describe --abbrev=0 --tags`
commit=`git rev-parse --short HEAD`
npx cordova-set-version -v "${tag}_${commit}"
