#!/bin/bash

confServer ()
{
    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/44b6b3d237fc93d6e6e371c900c53c55/3800b7f2e3b6602f2bd7ee5c6e5dac42/g' {} +

    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/pk_test_hFgjH1o4nOvkHHgtsSOfrQFs/pk_live_8tYimrx0lEM0zJ2tVyQwwyZM/g' {} +
}  

confLocal ()
{
    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/3800b7f2e3b6602f2bd7ee5c6e5dac42/44b6b3d237fc93d6e6e371c900c53c55/g' {} +

    find ./  -name '*.jsx' -type f -exec sed -i '' -e 's/pk_live_8tYimrx0lEM0zJ2tVyQwwyZM/pk_test_hFgjH1o4nOvkHHgtsSOfrQFs/g' {} +

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