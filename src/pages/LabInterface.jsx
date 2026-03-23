import LabInterfacePanel from "../components/lab/LabInterfacePanel";
import LabBackground from "../components/background/LabBakckground";

const examplePrompts = [
  "How could AI support SEND planning?",
  "I want to improve supplier evaluation in a small organisation.",
  "How can prompt quality be measured across interactions?",
  "Can simulation help with civic warning systems?",
];

export default function LabInterface() {
  return (
    <div className="px-6 pb-24 pt-24 md:pt-32">
      <section className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-sky-300/70">
              Lab Interface
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Explore an idea in a controlled experimental environment.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              The Lab Interface is a structured interaction surface designed to
              interpret ideas within a defined boundary. It is not an open chatbot
              or support agent. Instead, it reflects how SimCo Labs approaches
              experimentation, systems thinking and applied innovation.
            </p>

            <div className="mt-8 rounded-[26px] border border-white/10 bg-slate-950/50 p-6 backdrop-blur-sm">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-sky-300/70">
                How to use it
              </p>

              <div className="space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  Describe an idea, challenge or theme you are interested in.
                </p>
                <p>
                  The interface will interpret the likely domain, suggest possible
                  directions and surface related SimCo Labs experiments.
                </p>
                <p>
                  It is intentionally constrained to provide a focused and useful
                  experience rather than behave like a general-purpose assistant.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-sky-300/70">
                Example prompts
              </p>

              <div className="flex flex-wrap gap-3">
                {examplePrompts.map((prompt) => (
                  <span
                    key={prompt}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
                  >
                    {prompt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <LabInterfacePanel />
        </div>

      </section>
      <LabBackground />
    </div>
  );
}