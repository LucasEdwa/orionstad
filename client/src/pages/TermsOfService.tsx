import { TERMS_OF_SERVICE } from "../constants/termsOfService";

const TermsOfService = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center">
    <h1 className="text-3xl font-bold mb-6">{TERMS_OF_SERVICE.title}</h1>
    <h2 className="text-xl font-semibold mb-4">{TERMS_OF_SERVICE.sections[0].heading}</h2>
    <ul className="list-none mb-6 gap-2 flex flex-col">
      {TERMS_OF_SERVICE.sections[0].items?.map((item, idx) => (
        <li key={idx}>* {item}</li>
      ))}
    </ul>
    <h2 className="text-xl font-semibold mb-4">{TERMS_OF_SERVICE.sections[1].heading}</h2>
    <p>
      {TERMS_OF_SERVICE.sections[1].content}
    </p>
  </div>
);

export default TermsOfService;
