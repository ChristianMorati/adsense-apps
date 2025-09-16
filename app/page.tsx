'use client'

import { useRef, useState } from "react";

export default function Home() {
  type Theme = {
    name: string
  }

  const [themeName, setThemeName] = useState<string>('');
  const [seeShuffled, setSeeShuffled] = useState<boolean>(false);
  const [leaderMemberName, setLeaderMemberName] = useState<string>('');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [leaderMembers, setLeaderMembers] = useState<Theme[]>([]);
  const [shuffledThemes, setShuffledThemes] = useState<Theme[]>([]);

  const leaderMemberInput = useRef<HTMLInputElement>(null);
  const themeInput = useRef<HTMLInputElement>(null);

  function addTheme({ name }: { name: string }) {
    themeInput.current?.focus();
    if (!name) {
      alert("O TEMA deve ter no mínimo uma letra.")
      return;
    }
    setThemes(prev => [...prev, { name }]);
    setThemeName('');
  }

  function removeTheme({ index }: { index: number }) {
    setThemes(prev => prev.filter((_, i) => i !== index));
  }

  function addLeaderMember({ name }: { name: string }) {
    leaderMemberInput.current?.focus();
    if (!name) {
      alert("O Líder deve ter no mínimo uma letra.")
      return;
    }
    setLeaderMembers(prev => [{ name }, ...prev]);
    setLeaderMemberName('');
  }

  function removeLeaderMember({ index }: { index: number }) {
    setLeaderMembers(prev => prev.filter((_, i) => i !== index));
  }

  function shuffle(array: Theme[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function hasMembersAndThemesCorrectlyCount() {
    return themes.length == 0
      || themes.length != leaderMembers.length
  }

  function choose() {
    if (hasMembersAndThemesCorrectlyCount()) {
      alert("Temas e Membros devem ter a mesmo quantidade.")
      setSeeShuffled(false);
      return;
    }
    const shuffled = shuffle([...themes]);
    setShuffledThemes(shuffled)
    setSeeShuffled(true);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h3 className="mt-4 font-semibold text-xl md:text-2xl">Sorteador de Grupos</h3>
        <div className="flex flex-col
          gap-4
          md:flex-row
        ">
          <div className="flex flex-col gap-2">
            <h3 className="mt-4 font-semibold">Temas</h3>
            {themes.map((theme, index) => (
              <div key={index} className="flex items-center justify-between">
                <p>{theme.name}</p>
                <button
                  className="rounded-md bg-red-400 text-black font-semibold px-4 py-2"
                  onClick={() => removeTheme({ index })}
                >
                  x
                </button>
              </div>
            ))}
            <input
              ref={themeInput}
              onKeyDown={(e) => {
                if (!(themeName.length >= 1)) return
                if (e.key === "Enter") {
                  addTheme({ name: themeName });
                }
              }}
              className="border p-2 rounded-md min-w-[80vw] md:min-w-[20vw]"
              type="text"
              placeholder="Tema"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
            />
            <button
              className="rounded-md bg-green-400 text-black font-semibold px-4 py-2"
              onClick={() => addTheme({ name: themeName })}
            >
              ✔ Add Tema
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="mt-4 font-semibold">Líderes de Grupo</h3>
            {leaderMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <p>{member.name}</p>
                <button
                  className="rounded-md bg-red-400 text-black font-semibold px-4 py-2"
                  onClick={() => removeLeaderMember({ index })}
                >
                  x
                </button>
              </div>
            ))}
            <input
              ref={leaderMemberInput}
              className="border p-2 rounded-md min-w-[80vw] md:min-w-[20vw]"
              type="text"
              placeholder="Líder"
              value={leaderMemberName}
              onChange={(e) => {
                setLeaderMemberName(e.target.value)
              }}
              onKeyDown={(e) => {
                if (!(leaderMemberName.length >= 1)) return
                if (e.key === "Enter") {
                  addLeaderMember({ name: leaderMemberName });
                }
              }}
            />
            <button
              className="rounded-md bg-blue-400 text-black font-semibold px-4 py-2"
              onClick={() => addLeaderMember({ name: leaderMemberName })}
            >
              ✔ Add Lìder
            </button>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <button
            className="rounded-md bg-blue-400 text-black font-semibold px-4 py-2"
            onClick={() => choose()}
          >
            Sortear / Reembaralhar
          </button>
        </div>
        {seeShuffled && (
          <>
            <table className="min-w-full border border-gray-700 text-left text-sm text-gray-200 bg-gray-900 rounded-lg mt-4">
              <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700">Líder</th>
                  <th className="px-4 py-2 border-b border-gray-700">Tema</th>
                </tr>
              </thead>
              <tbody>
                {shuffledThemes.map((_, index) => {
                  const member = leaderMembers[index]?.name ?? '';
                  const theme = shuffledThemes[index]?.name ?? '';
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-4 py-2 border-b border-gray-700">{member}</td>
                      <td className="px-4 py-2 border-b border-gray-700">{theme}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="rounded-md bg-red-400 text-black font-semibold px-4 py-2"
              onClick={() => setSeeShuffled(false)}
            >
              Ocultar Tabela
            </button>
          </>
        )}
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}
