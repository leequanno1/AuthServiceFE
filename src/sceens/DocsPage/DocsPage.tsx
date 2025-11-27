import { useEffect, useState } from "react";
import "./DocsPage.css";
import Header1 from "../../components/Header1/Header1";

const DocsPage: React.FC = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/docs/docs.html")
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        setContent(doc.body.innerHTML);
      })
      .catch(() => setContent("Failed to load documentation."));
  }, []);

  return (
    <>
      <div className="docs-container">
        <aside className="docs-sidebar">
          <h2 className="sidebar-title">Table of content</h2>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <a href="#introduction">I. Introduction</a>
              </li>
              <li>
                <a href="#installation">II. Installation</a>
              </li>
              <li>
                <a href="#configuration">III. Configuration</a>
              </li>
              <li>
                <a href="#methods">IV. Methods</a>
              </li>
              <li>
                <a href="#oauth2">V. OAuth2 Methods</a>
              </li>
              <li>
                <a href="#errorHandling">VI. Error Handling</a>
              </li>
              <li>
                <a href="#flow">VII. Authentication Flows</a>
              </li>
              <li>
                <a href="#conclusion">VIII. Conclusion</a>
              </li>
            </ul>
          </nav>
        </aside>

        <main
          className="docs-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></main>
      </div>
    </>
  );
};

export default DocsPage;
