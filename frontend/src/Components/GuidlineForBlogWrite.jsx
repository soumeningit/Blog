import React from "react";
import { Link } from "react-router-dom";

function GuidlineForBlogWrite() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-800 p-6">
      <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Guidelines for Blog Writing
        </h1>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            1. You need to be registered as an <strong>author</strong> to write
            a blog.
          </p>
          <p>
            2. If you are already an author, you can write a blog by clicking on
            this
            <Link to={"/signin"} className="text-cyan-600 hover:underline ml-1">
              Login{" "}
            </Link>
            button.
          </p>
          <p>
            3. After a successful login, you can write a blog by clicking on the
            button <strong>"Write a Blog"</strong>.
          </p>
          <p>4. You can write a blog in your own language.</p>
          <p>5. You can write a blog in any category.</p>
          <p>
            6. If you are not registered as an author, you can register by
            clicking on this
            <Link
              to={"/registration"}
              className="text-cyan-600 hover:underline ml-1"
            >
              Register{" "}
            </Link>
            button with another email.
          </p>
          <p>
            7. After registration, you can write a blog by following the above
            steps.
          </p>
          <p>
            8. If you have any queries, you can contact us by clicking on this
            <Link
              to={"/contact"}
              className="text-cyan-600 hover:underline ml-1"
            >
              Contact{" "}
            </Link>
            button.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GuidlineForBlogWrite;
