echo "< ========= Setup Start ========= >"

CURRENT_SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
GIT_HOOK_DIR_PATH="${CURRENT_SCRIPT_PATH}/../../.git/hooks/"

ln -s ${CURRENT_SCRIPT_PATH}/pre-push.sh ${GIT_HOOK_DIR_PATH}/pre-push && chmod +x ${GIT_HOOK_DIR_PATH}/pre-push

if [ $? != 0 ]
then
echo "< ========= Setup Failed ========= >"
  exit 1
fi

echo "< ========= Setup Complete =========>"
