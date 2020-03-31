main()
{
  # ApplicationSubDomainName
  local application_host="hamv2-stg.apps.exosite.io"
  if [[ ! -z "$ApplicationSubDomainName" ]]; then
    application_host="$ApplicationSubDomainName"
  fi

  # ProductId
  local product_host="c46w2egr9wem00000.m2.exosite.io:443"
  if [[ ! -z "$ProductId" ]]; then
    product_host="$ProductId"
  fi

  # FacebookServiceId
  local fb_service_id="429411750748999"
  if [[ ! -z "$FacebookServiceId" ]]; then
    fb_service_id="$FacebookServiceId"
  fi

  # FacebookAppName
  local fb_app_name="Micro-Vertical App"
  if [[ ! -z "$FacebookAppName" ]]; then
    fb_app_name="$FacebookAppName"
  fi

  # AppSchemeName
  local app_scheme_name="breezey"
  if [[ ! -z "$AppSchemeName" ]]; then
    app_scheme_name="$AppSchemeName"
  fi

  # AppWidgetId
  local app_widget_id="com.microvert.mobile"
  if [[ ! -z "$AppWidgetId" ]]; then
    if [[ "$app_widget_id" != "$AppWidgetId" ]]; then
      sh scripts/remove_dependencies.sh
      rm -f google-services.json GoogleService-Info.plist
    fi
    app_widget_id="$AppWidgetId"
  fi

  # DisplayProductName
  local display_product_name="Breezey"
  if [[ ! -z "$DisplayProductName" ]]; then
    display_product_name="$DisplayProductName"
  fi

  # DisplayWifiName
  local display_wifi_name="Breezey-XXXX"
  if [[ ! -z "$DisplayWifiName" ]]; then
    display_wifi_name="$DisplayWifiName"
  fi

  # Record
  echo "ApplicationHost: $application_host"
  echo "ProductHost: $product_host"
  echo "FacebookServiceId: $fb_service_id"
  echo "FacebookAppName: $fb_app_name"
  echo "AppSchemeName: $app_scheme_name"
  echo "AppWidgetId: $app_widget_id"
  echo "DisplayProductName: $display_product_name"
  echo "DisplayWifiName: $display_wifi_name"

  local target_hockey_app_android_id="bb3f9511014445e6a2d90dc16c508248"
  local target_hockey_app_ios_id="aa03af714f354a7baf8e29bb41db03dd"

  # Can be branch name, tag, commit hash
  local taret_app_engine_ver="2.0.0"

  local blue=`tput setaf 4`
  local cyan=`tput setaf 6`
  local green=`tput setaf 2`
  local red=`tput setaf 1`
  local reset=`tput sgr0`
  local yellow=`tput setaf 3`

  local ori_env="smarthome.apps.exosite.io"
  local ori_fb_service_id="MY_APP_ID"
  local ori_fb_app_name="My App Name"
  local ori_prod_name="myproduct"

  # Change this to your target folder paht!
  local target_folder_path="./"

  # 1: app version, e.g. 1.3.0
  # if [ "$1" = '' ]
  # then
  #   echo "${red}ERROR: Please input the app engine version (e.g. 1.3.0) and run the script again.${reset}"
  #   return 1
  # fi

  update_config_xml
  update_package_json $1
  update_app_config
}

update_app_config()
{
  ori_solution_host="solutionId.apps.exosite.io"
  ori_product_host="productId.m2.exosite.io:443"
  ori_hockey_app_android_id=""
  ori_hockey_app_ios_id=""
  ori_theme_product_name="Product Name"
  ori_theme_wifi_name="WifiName-XXXX"

  app_path="src/app"
  app_config_file="app.config.ts"
  echo "${blue}Start to do the clean task for ${cyan}\"${app_config_file}\"${reset}"

  eval cd ${target_folder_path}"/"${app_path}

  # Update the solutionId
  sed -i '' -e "s/solutionHost: '"${ori_solution_host}"',/solutionHost: '"${application_host}"',/g" ${app_config_file}
  sed -i '' -e "s/productHost: '"${ori_product_host}"',/productHost: '"${product_host}"',/g" ${app_config_file}

  # Update the hockey app id
  sed -i '' -e "s/android: '"${ori_hockey_app_android_id}"',/android: '"${target_hockey_app_android_id}"',/g" ${app_config_file}
  sed -i '' -e "s/ios: '"${ori_hockey_app_ios_id}"',/ios: '"${target_hockey_app_ios_id}"',/g" ${app_config_file}

  # Update the theme variables
  sed -i '' -e "s/productName: '""${ori_theme_product_name}""',/productName: '""${display_product_name}""',/g" ${app_config_file}
  sed -i '' -e "s/wifiName: '"${ori_theme_wifi_name}"',/wifiName: '"${display_wifi_name}"',/g" ${app_config_file}

  # Back to the origin folder
  cd -

  echo "${green}Clean "${app_config_file}" done!${reset}"
}

update_config_xml()
{
  ori_app_widget_id="com.example.myapp"

  config_file="config.xml"
  echo "${blue}Start to do the clean task for ${cyan}\"${config_file}\"${reset}"

  eval cd ${target_folder_path}

  # Update the widget id
  sed -i '' -e 's/<widget id="'${ori_app_widget_id}'"/<widget id="'${app_widget_id}'"/g' ${config_file}

  # Update the facebook plugin variables
  sed -i '' -e 's/<variable name="APP_ID" value="'${ori_fb_service_id}'"/<variable name="APP_ID" value="'${fb_service_id}'"/g' ${config_file}
  sed -i '' -e 's/<variable name="APP_NAME" value="'"${ori_fb_app_name}"'"/<variable name="APP_NAME" value="'"${fb_app_name}"'"/g' ${config_file}

  sed -i '' -e 's/<string name="fb_app_id">'${ori_fb_service_id}'/<string name="fb_app_id">'${fb_service_id}'/g' ${config_file}
  sed -i '' -e 's/<string name="fb_app_name">'"${ori_fb_app_name}"'/<string name="fb_app_name">'"${fb_app_name}"'/g' ${config_file}

  # Update the deep link plugin variables
  sed -i '' -e 's/<variable name="URL_SCHEME" value="'${ori_prod_name}'"/<variable name="URL_SCHEME" value="'${app_scheme_name}'"/g' ${config_file}
  sed -i '' -e 's/<variable name="DEEPLINK_SCHEME" value="'${ori_prod_name}'"/<variable name="DEEPLINK_SCHEME" value="'${app_scheme_name}'"/g' ${config_file}
  sed -i '' -e 's/<variable name="DEEPLINK_HOST" value="'${ori_env}'"/<variable name="DEEPLINK_HOST" value="'${application_host}'"/g' ${config_file}

  # Back to the origin folder
  cd -

  echo "${green}Clean "${config_file}" done!${reset}"
}

update_package_json()
{
  app_engine_version=$1
  semi_folder="semi_vertical_app_engine"
  micro_folder="micro_vertical_app_engine"
  package_file="package.json"
  echo "${blue}Start to do the clean task for ${cyan}\"${package_file}\"${reset}"

  eval cd ${target_folder_path}

  # Update app engine folder name and version
  # sed -i '' -e 's/"app-engine": "exosite\/'${semi_folder}'.*"/"app-engine": "exosite\/'${micro_folder}'#v'${app_engine_version}'"/g' ${package_file}

  # Update the facebook plugin variables
  sed -i '' -e 's/"APP_ID": "'${ori_fb_service_id}'",/"APP_ID": "'${fb_service_id}'",/g' ${package_file}
  sed -i '' -e 's/"APP_NAME": "'"${ori_fb_app_name}"'"/"APP_NAME": "'"${fb_app_name}"'"/g' ${package_file}

  # Update the deep link plugin variables
  sed -i '' -e 's/"URL_SCHEME": "'${ori_prod_name}'",/"URL_SCHEME": "'${app_scheme_name}'",/g' ${package_file}
  sed -i '' -e 's/"DEEPLINK_SCHEME": "'${ori_prod_name}'",/"DEEPLINK_SCHEME": "'${app_scheme_name}'",/g' ${package_file}
  sed -i '' -e 's/"DEEPLINK_HOST": "'${ori_env}'",/"DEEPLINK_HOST": "'${application_host}'",/g' ${package_file}

  # Back to the origin folder
  cd -

  echo "${green}Clean "${package_file}" done!${reset}"
}

main $*
