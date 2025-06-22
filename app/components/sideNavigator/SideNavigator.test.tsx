import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import SideNavigator from "./SideNavigator";

const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams("");

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useSearchParams: () => mockSearchParams,
}));

describe("SideNavigator", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockSearchParams.set("minPrice", "0");
    mockSearchParams.set("maxPrice", "1000000");
    mockSearchParams.set("isSoldOut", "false");
  });

  it("초기 렌더링 시 URL 파라미터가 폼에 올바르게 반영되는지 확인", () => {
    render(<SideNavigator />);

    expect(screen.getByText("₩0")).toBeInTheDocument();
    expect(screen.getByText("₩1,000,000")).toBeInTheDocument();

    const toggleSwitch = screen.getByRole("checkbox");
    expect(toggleSwitch).not.toBeChecked();
  });

  it("가격 필터 변경 시 URL 파라미터가 올바르게 변경되는지 확인", async () => {
    render(<SideNavigator />);

    const rangeInputs = screen.getAllByRole("slider");
    const minInput = rangeInputs[0];
    const maxInput = rangeInputs[1];

    fireEvent.change(minInput, { target: { value: "200000" } });
    fireEvent.change(maxInput, { target: { value: "500000" } });

    // 가격 표시가 업데이트되는지 확인
    await waitFor(() => {
      expect(screen.getByText("₩200,000")).toBeInTheDocument();
      expect(screen.getByText("₩500,000")).toBeInTheDocument();
    });

    // 필터 검색 버튼 클릭
    const submitButton = screen.getByRole("button", { name: "필터조건 검색" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("minPrice=200000")
      );
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("maxPrice=500000")
      );
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("isSoldOut=false")
      );
    });
  });

  it("품절 상태 토글 시 URL 파라미터가 올바르게 변경되는지 확인", async () => {
    render(<SideNavigator />);

    const toggleSwitch = screen.getByRole("checkbox");
    fireEvent.click(toggleSwitch);

    await waitFor(() => {
      expect(toggleSwitch).toBeChecked();
    });

    const submitButton = screen.getByRole("button", { name: "필터조건 검색" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("isSoldOut=true")
      );
    });
  });

  it("가격과 품절 상태 모두 변경 시 URL 파라미터가 올바르게 변경되는지 확인", async () => {
    render(<SideNavigator />);

    const rangeInputs = screen.getAllByRole("slider");
    const minInput = rangeInputs[0];
    const maxInput = rangeInputs[1];

    fireEvent.change(minInput, { target: { value: "300000" } });
    fireEvent.change(maxInput, { target: { value: "700000" } });

    const toggleSwitch = screen.getByRole("checkbox");
    fireEvent.click(toggleSwitch);

    const submitButton = screen.getByRole("button", { name: "필터조건 검색" });
    fireEvent.click(submitButton);

    // 모든 파라미터가 올바르게 포함되는지 확인
    await waitFor(() => {
      const calledUrl = mockReplace.mock.calls[0][0];
      expect(calledUrl).toContain("minPrice=300000");
      expect(calledUrl).toContain("maxPrice=700000");
      expect(calledUrl).toContain("isSoldOut=true");
    });
  });

  it("URL 파라미터가 변경될 때 폼 값이 올바르게 업데이트되는지 확인", async () => {
    mockSearchParams.set("minPrice", "100000");
    mockSearchParams.set("maxPrice", "800000");
    mockSearchParams.set("isSoldOut", "true");

    render(<SideNavigator />);

    await waitFor(() => {
      expect(screen.getByText("₩100,000")).toBeInTheDocument();
      expect(screen.getByText("₩800,000")).toBeInTheDocument();
    });

    const toggleSwitch = screen.getByRole("checkbox");
    expect(toggleSwitch).toBeChecked();
  });
});
