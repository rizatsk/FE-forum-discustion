import { afterEach, describe, expect, it, vi } from "vitest";
import DiscustionItem from "../../../components/Home/DiscustionItem";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "../../../states";
import { postedAt } from "../../../utils";
import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from "../../../states/authUser/action";
import userEvent from "@testing-library/user-event";
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from "../../../states/threads/action";

/**
 * skenario test
 *
 *  - DiscustionItem component
 *    - should have data thread
 *    - should button solidLike to be in document
 *    - should button solidDislike to be in document
 *    - should button disliked clicked
 *    - should button disliked clicked when the user has disliked it
 *    - should navigate is called when thread-title clicked
 */

vi.mock("../../../states/threads/action", async () => {
  const actual = await vi.importActual("../../../states/threads/action");
  return {
    ...actual,
    asyncNeutralVoteThread: vi.fn(),
    asyncDownVoteThread: vi.fn(),
    asyncUpVoteThread: vi.fn(),
  };
});
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("DiscustionItem component", () => {
  const fakeUser = {
    id: "user-124",
    name: "Rizat",
    avatar: "https://generatephoto.com",
  };

  const fakeThread = {
    id: "thread-123",
    title: "Hello",
    body: "Hello World",
    category: "Hello",
    owner: {
      avatar: "https://generatephoto.com",
      name: "rizat",
    },
    createdAt: new Date(),
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 3,
  };

  afterEach(() => {
    cleanup();
    store.dispatch(unsetAuthUserActionCreator());
  });

  it("should have data thread", () => {
    // Arrange
    render(
      <Provider store={store}>
        <DiscustionItem thread={fakeThread} />
      </Provider>
    );

    // Action
    const imgOwnerThread = screen.getByTestId("img-owner-thread");
    const nameOwnerThread = screen.getByTestId("name-owner-thread");
    const threadCreatedAt = screen.getByTestId("thread-createdAt");
    const threadTitle = screen.getByTestId("thread-title");
    const threadBody = screen.getByTestId("thread-body");
    const iconUpVote = screen.getByTestId("icon-upVote");
    const iconDownVote = screen.getByTestId("icon-downVote");
    const threadTotalComment = screen.getByTestId("thread-totalComment");
    const threadCategory = screen.getByTestId("thread-category");

    // Assert
    expect(imgOwnerThread.nodeName).toBe("IMG");
    expect(imgOwnerThread).toHaveAttribute("src", fakeThread.owner.avatar);
    expect(imgOwnerThread).toHaveAttribute("alt", fakeThread.owner.name);
    expect(nameOwnerThread).toHaveTextContent(fakeThread.owner.name);
    expect(threadCreatedAt).toHaveTextContent(postedAt(fakeThread.createdAt));
    expect(threadTitle).toHaveTextContent(fakeThread.title);
    expect(threadBody).toHaveTextContent(fakeThread.body);
    expect(iconUpVote).toBeInTheDocument();
    expect(iconDownVote).toBeInTheDocument();
    expect(threadTotalComment).toHaveTextContent(fakeThread.totalComments);
    expect(threadCategory).toHaveTextContent(fakeThread.category);
  });
  it("should button solidLike to be in document", () => {
    // Arrange
    // set redux authUser
    store.dispatch(setAuthUserActionCreator(fakeUser));

    const newFakeThread = {
      ...fakeThread,
      upVotesBy: fakeThread.upVotesBy.concat(fakeUser.id),
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<DiscustionItem thread={newFakeThread} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    // Action
    const iconUpVote = screen.getByTestId("icon-upVote-liked");

    // Expect
    expect(iconUpVote).toBeInTheDocument();
  });
  it("should button solidDislike to be in document", async () => {
    // Arrange
    // set redux authUser
    store.dispatch(setAuthUserActionCreator(fakeUser));

    const newFakeThread = {
      ...fakeThread,
      downVotesBy: fakeThread.downVotesBy.concat(fakeUser.id),
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<DiscustionItem thread={newFakeThread} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    // Action
    const iconDownVote = screen.getByTestId("icon-downVote-disliked");

    // Expect
    expect(iconDownVote).toBeInTheDocument();
  });
  it("should button disliked clicked", async () => {
    // Arrange
    // set redux authUser
    store.dispatch(setAuthUserActionCreator(fakeUser));

    const newFakeThread = {
      ...fakeThread,
    };

    const mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<DiscustionItem thread={newFakeThread} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const buttonDownVote = screen.getByTestId("button-downVote");

    // Action
    await userEvent.click(buttonDownVote);

    // Expect
    expect(mockDispatch).toHaveBeenCalledWith(
      asyncDownVoteThread(fakeThread.id)
    );
  });
  it("should button disliked clicked when the user has disliked it", async () => {
    // Arrange
    // set redux authUser
    store.dispatch(setAuthUserActionCreator(fakeUser));

    const newFakeThread = {
      ...fakeThread,
      downVotesBy: fakeThread.downVotesBy.concat(fakeUser.id),
    };

    const mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<DiscustionItem thread={newFakeThread} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const iconDownVote = screen.getByTestId("icon-downVote-disliked");
    const buttonDownVote = screen.getByTestId("button-downVote");

    // Action
    await userEvent.click(buttonDownVote);

    // Expect
    expect(iconDownVote).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledWith(
      asyncNeutralVoteThread(fakeThread.id)
    );
  });
  it("should navigate is called when thread-title clicked", async () => {
    // Arrange
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DiscustionItem thread={fakeThread} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const threadTitle = screen.getByTestId("thread-title");
    // Action
    await userEvent.click(threadTitle);

    // Expect
    expect(mockNavigate).toHaveBeenCalledWith(`/thread/${fakeThread.id}`);
  });
});
