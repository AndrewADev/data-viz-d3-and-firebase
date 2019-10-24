#!/bin/bash
#
# Run minimal setup for the project
#

ENV_FILE=.env.local
ENV_FILE_TEMPLATE=env.local.template
if test -f "$ENV_FILE"; then
    echo 'Environment file already exists, nothing to do.'
else
    echo 'Copying environment file from template'
    cp -v "./setup/$ENV_FILE_TEMPLATE" "$ENV_FILE"
    echo 'Finished - Be sure to add your own configuration values!'
fi
