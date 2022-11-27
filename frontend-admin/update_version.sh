#!/bin/bash
source .env.development
NEXTVERSION=$(echo ${VUE_APP_VERSION} | awk -F. -v OFS=. '{$NF += 1 ; print}')
sed -i -e "s/$VUE_APP_VERSION/$NEXTVERSION/g" .env.development
