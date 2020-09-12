import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="twainprod.com" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("twainprod.com"); // Сравнения статуса в state и ожидаемого
  });

  test("after creation <span> with status should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="twainprod.com" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull(); // Span не будет пустым
  });

  test("after creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="twainprod.com" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  }); // Input не будет показан

  test("after creation <span> with status should contains correct status", () => {
    const component = create(<ProfileStatus status="twainprod.com" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("twainprod.com"); // Сравнение ожидаемого статуса и статуса в span
  });

  test("input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="twainprod.com" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick(); // Вызов функции двойного клика
    let input = root.findByType("input");
    expect(input.props.value).toBe("twainprod.com"); // Сравнение ожидаемого статуса и значения в input
  });

  test("callback should be called", () => {
    const mockCallback = jest.fn(); // Создание фейковой функции callback'a
    const component = create(
      <ProfileStatus status="twainprod.com" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1); // Узнать количество вызовов функции callback
  });
});
