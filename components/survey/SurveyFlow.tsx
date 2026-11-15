"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSurveyAnswers } from "@/lib/storage";
import {
  BUDGETS,
  DURATIONS,
  FORMATS,
  GOALS,
  GRADES,
  INTERESTS,
  LANGUAGES,
  READING_LEVELS,
} from "@/lib/taxonomy";
import type { Budget, Language } from "@/types/survey";
import { ProgressIndicator } from "./ProgressIndicator";
import { MultiChoice, SingleChoice } from "./Choice";

const STEP_LABELS = ["Lớp học", "Khả năng đọc", "Chủ đề yêu thích", "Kiểu sách", "Mục tiêu và thói quen"];
const TITLES = [
  "Bé đang học lớp mấy?",
  "Khả năng đọc hiện tại của bé",
  "Bé yêu thích chủ đề nào?",
  "Bé thích đọc sách như thế nào?",
  "Mục tiêu và thói quen đọc",
];

export function SurveyFlow() {
  const router = useRouter();
  const { answers, update, reset, hydrated } = useSurveyAnswers();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const last = STEP_LABELS.length - 1;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  function validate(): string | null {
    switch (step) {
      case 0:
        return answers.grade === null ? "Hãy chọn lớp của bé để tiếp tục." : null;
      case 1:
        return answers.readingLevel === null ? "Hãy chọn mô tả gần nhất với khả năng đọc của bé." : null;
      case 2:
        return answers.interests.length === 0 ? "Hãy chọn ít nhất một chủ đề bé yêu thích (tối đa 3)." : null;
      case 3:
        return answers.format === null ? "Hãy chọn kiểu sách bé thích đọc." : null;
      default:
        if (answers.goals.length === 0) return "Hãy chọn ít nhất một mục tiêu đọc sách.";
        if (answers.duration === null) return "Hãy chọn thời gian bé thường đọc mỗi lần.";
        return null;
    }
  }

  function next() {
    const e = validate();
    setError(e);
    if (e) return;
    if (step === last) router.push("/recommendations");
    else setStep(step + 1);
  }

  function back() {
    setError(null);
    setStep(Math.max(0, step - 1));
  }

  return (
    <div className="container-page py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <ProgressIndicator step={step} total={STEP_LABELS.length} labels={STEP_LABELS} />

        <form
          noValidate
          onSubmit={(ev) => {
            ev.preventDefault();
            next();
          }}
          className="mt-10"
        >
          <div key={step} className="step-in">
            <h1 ref={headingRef} tabIndex={-1} className="text-3xl outline-none sm:text-4xl">
              {TITLES[step]}
            </h1>
            {step === 0 && (
              <p className="mt-2 text-ink-soft">Chỉ cần chọn lớp. Mầm Đọc không hỏi tên, ngày sinh hay trường của bé.</p>
            )}

            <div className="mt-8 space-y-10">
              {step === 0 && (
                <SingleChoice
                  legend="Chọn lớp của bé"
                  options={GRADES.map((g) => ({ id: g.id, label: g.label }))}
                  value={answers.grade}
                  onChange={(v) => { update({ grade: v }); setError(null); }}
                  columns={5}
                  large
                />
              )}
              {step === 1 && (
                <SingleChoice
                  legend="Câu nào gần nhất với bé?"
                  hint="Lớp học chưa phản ánh hết khả năng đọc, nên chúng mình hỏi riêng."
                  options={READING_LEVELS.map((l) => ({ id: l.id, label: l.survey }))}
                  value={answers.readingLevel}
                  onChange={(v) => { update({ readingLevel: v }); setError(null); }}
                />
              )}
              {step === 2 && (
                <MultiChoice
                  legend="Chọn tối đa 3 chủ đề"
                  options={INTERESTS}
                  values={answers.interests}
                  max={3}
                  onChange={(v) => { update({ interests: v }); setError(null); }}
                  columns={3}
                />
              )}
              {step === 3 && (
                <SingleChoice
                  legend="Chọn kiểu sách bé thích nhất"
                  options={FORMATS.map((f) => ({ id: f.id, label: f.survey }))}
                  value={answers.format}
                  onChange={(v) => { update({ format: v }); setError(null); }}
                />
              )}
              {step === 4 && (
                <>
                  <MultiChoice
                    legend="Mục tiêu đọc sách của gia đình"
                    hint="Chọn một hoặc nhiều mục."
                    options={GOALS}
                    values={answers.goals}
                    onChange={(v) => { update({ goals: v }); setError(null); }}
                    columns={1}
                  />
                  <SingleChoice
                    legend="Bé thường đọc mỗi lần khoảng bao lâu?"
                    options={DURATIONS}
                    value={answers.duration}
                    onChange={(v) => { update({ duration: v }); setError(null); }}
                    columns={3}
                  />
                  <SingleChoice<Language | null>
                    legend="Ngôn ngữ sách (không bắt buộc)"
                    options={[...LANGUAGES, { id: null, label: "Không quan trọng" }]}
                    value={answers.language}
                    onChange={(v) => update({ language: v })}
                    columns={2}
                  />
                  <SingleChoice<Budget | null>
                    legend="Ngân sách mỗi cuốn (không bắt buộc)"
                    options={[...BUDGETS, { id: null, label: "Chưa quyết định" }]}
                    value={answers.budget}
                    onChange={(v) => update({ budget: v })}
                    columns={2}
                  />
                </>
              )}
            </div>
          </div>

          <div aria-live="assertive" className="mt-6 min-h-6">
            {error && (
              <p role="alert" className="border-l-4 border-terracotta bg-paper-2 px-4 py-3 font-medium text-terracotta-ink">
                {error}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-6">
            {step > 0 ? (
              <button type="button" onClick={back} className="btn btn-outline">← Quay lại</button>
            ) : (
              <span />
            )}
            <button type="submit" className="btn btn-primary" disabled={!hydrated}>
              {step === last ? "Xem sách cho bé" : "Tiếp tục"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-sm text-ink-soft">
          Câu trả lời chỉ được giữ tạm trong trình duyệt này.{" "}
          <button type="button" className="link-underline" onClick={() => { reset(); setStep(0); setError(null); }}>
            Xoá câu trả lời và bắt đầu lại
          </button>
        </p>
      </div>
    </div>
  );
}
