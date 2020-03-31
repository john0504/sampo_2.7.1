export PATH="$PATH:/usr/local/bin"
export LANG=en_US.UTF-8
npm i -g ionic@4 cordova@9
./jenkins/common.sh
security unlock-keychain -p "slave" /Users/jenkins/Library/Keychains/login.keychain-db
npx ionic cordova platform add ios
cd platforms/ios
pod install
cd ../..
npx ionic cordova build ios --device --prod -- --buildFlag="-UseModernBuildSystem=0"
