#!/bin/bash
export LOCAL_MIXPANEL='a1c48cab157e61bdb24c9b6756de12b8'
export PRODUCTION_MIXPANEL='a6a2c6430be4e938506b27286e8a00a0'
export LOCAL_STRIPE='pk_test_rLuroFoR4XKOxb3FbmJqTqrh'
export PRODUCTION_STRIPE='pk_live_8tYimrx0lEM0zJ2tVyQwwyZM'
export LOCAL_URL='http://localhost:8000/api/graphql/'
export PRODUCTION_URL='https://squadup.xyz/api/graphql'
#!/bin/bash

confLocal ()
{
    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/'$PRODUCTION_MIXPANEL'/'$LOCAL_MIXPANEL'/g' {} +

    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/'$PRODUCTION_STRIPE'/'$LOCAL_STRIPE'/g' {} +
    
    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/'$PRODUCTION_STRIPE'/'$LOCAL_STRIPE'/g' {} +
}  

confServer ()
{
    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/'$LOCAL_MIXPANEL'/'$PRODUCTION_MIXPANEL'/g' {} +

    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/'$LOCAL_STRIPE'/'$PRODUCTION_STRIPE'/g' {} +

}  

if [ $1 = "server" ]; then
    confServer
    exit 0
elif [ $1 = "local" ]; then
    confLocal
    exit 0
else
    echo ERROR: "Unrecognized value."
    exit 1
fi