import React from "react";

const categories = [
  { name: "Category 1", id: 1 },
  { name: "Category 2", id: 2 },
  { name: "Category 3", id: 3 },
  { name: "Category 4", id: 4 },
  { name: "Category 5", id: 5 },
];

const data = [
  {
    thumbnail: "https://via.placeholder.com/150",
    title: "Title 1",
    description: "Description 1",
    category: 1,
  },
  {
    thumbnail: "https://via.placeholder.com/150",
    title: "Title 2",
    description: "Description 2",
    category: 2,
  },
  {
    thumbnail: "https://via.placeholder.com/150",
    title: "Title 3",
    description: "Description 3",
    category: 3,
  },
  {
    thumbnail: "https://via.placeholder.com/150",
    title: "Title 4",
    description: "Description 4",
    category: 4,
  },
  {
    thumbnail: "https://via.placeholder.com/150",
    title: "Title 5",
    description: "Description 5",
    category: 5,
  },
];
function FindByCategory() {
  const findItemByCategory = (id) => {
    console.log(id);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold text-gray-50">Find By Category</h1>
      <div className="flex flex-row space-x-2">
        {categories.map((data) => {
          return (
            <div
              onClick={() => findItemByCategory(data.id)}
              key={data.id}
              className="flex flex-row px-2 py-1 items-center rounded-full text-gray-50 space-x-4 border-1 boreder-gray-100 cursor-pointer hover:bg-gray-800 hover:text-gray-50 hover:bg-opacity-10"
            >
              <p className="text-base">{data.name}</p>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

export default FindByCategory;
