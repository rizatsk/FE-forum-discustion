const ActionType = {
  RECEIVE_CATEGORY_THREADS: "RECEIVE_CATEGORY_THREADS",
};

function receiveCategoryThreadsActionCreator(categoryThreads) {
  return {
    type: ActionType.RECEIVE_CATEGORY_THREADS,
    payload: {
      categoryThreads,
    },
  };
}

export { ActionType, receiveCategoryThreadsActionCreator };
