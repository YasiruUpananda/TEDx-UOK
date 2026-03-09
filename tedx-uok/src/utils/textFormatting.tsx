import React from 'react';

/**
 * Parses a string and replaces occurrences of "TEDx UoK" and "TEDx"
 * with React nodes containing correctly formatted superscript "x".
 * 
 * @param text The text to format
 * @param isTopic If true, applies brand red (#EB0028) and bold to TEDx. Defaults to false (paragraph style).
 */
export function formatTedxText(text: string | null | undefined, isTopic: boolean = false): React.ReactNode {
  if (!text) return text;

  // Split the text to isolate TEDx variations.
  const parts = text.split(/(TEDx University of Kelaniya|TEDx UoK|TEDxUoK|TEDx UOK|TEDxUOK|TEDx)\b/g);

  const tedxRed = "#EB0028";

  return (
    <>
      {parts.map((part, index) => {
        if (["TEDx University of Kelaniya", "TEDx UoK", "TEDxUoK", "TEDx UOK", "TEDxUOK"].includes(part)) {
          const isFullUniversity = part === "TEDx University of Kelaniya";
          return (
            <span key={index} className={isTopic ? "font-extrabold" : ""}>
              <span style={isTopic ? { color: tedxRed } : {}}>TED</span>
              <sup className="uppercase" style={{ 
                fontSize: '0.7em', 
                top: '-0.3em', 
                position: 'relative',
                color: isTopic ? tedxRed : 'inherit'
              }}>x</sup>
              <span className="font-normal text-inherit"> {isFullUniversity ? "University of Kelaniya" : "UoK"}</span>
            </span>
          );
        }
        if (part === "TEDx") {
          return (
            <span key={index} className={isTopic ? "font-extrabold" : ""}>
              <span style={isTopic ? { color: tedxRed } : {}}>TED</span>
              <sup className="uppercase" style={{ 
                fontSize: '0.7em', 
                top: '-0.3em', 
                position: 'relative',
                color: isTopic ? tedxRed : 'inherit'
              }}>x</sup>
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
