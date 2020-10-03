echo "< ======= Stashing untracked and unstaged files ======= >" 

isStashed=`git stash -k -u | grep "Saved working directory and index state WIP on"`
npm test && npm run lint

STATUS=$?

echo "< ======== Unstashing ========= >"

if [ "$isStashed" ]
 then
    git stash pop
fi

if [ ${STATUS} != 0 ]
then
    exit 1
fi