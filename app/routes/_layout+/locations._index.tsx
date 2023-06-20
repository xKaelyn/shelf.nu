import { LoaderArgs, json, type V2_MetaFunction } from "@remix-run/node";
import Header from "~/components/layout/header";
import { List } from "~/components/list";

import { appendToMetaTitle } from "~/utils/append-to-meta-title";
import { Button } from "~/components/shared/button";
import { useNavigate } from "@remix-run/react";
import { requireAuthSession } from "~/modules/auth";

export async function loader({ request }: LoaderArgs) {
  await requireAuthSession(request);
  const title = "Locations";
  const header = {
    title,
  };
  return json({ header });
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  { title: data ? appendToMetaTitle(data.header.title) : "" },
];

export default function LocationsIndexPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Button
          to="new"
          role="link"
          aria-label={`new asset`}
          icon="location"
          data-test-id="createNewLocation"
        >
          Add Location
        </Button>
      </Header>
      <div className="mt-8 flex flex-1 flex-col md:mx-0 md:gap-2">
        <List
          ItemComponent={ListItemContent}
          navigate={(itemId) => navigate(itemId)}
          headerChildren={
            <>
              <th className="hidden border-b p-4 text-left font-normal text-gray-600 md:table-cell md:px-6">
                Assets
              </th>
            </>
          }
        />
      </div>
    </>
  );
}

const ListItemContent = ({ item }: { item: any }) => {
  return (
    <>
      <td className="w-full  border-b">
        <div className="flex justify-between gap-3 p-4 md:justify-normal md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border">
              <img
                src={item.img}
                alt="img"
                className="h-10 w-10 rounded-[4px] object-cover"
              />
            </div>
            <div className="flex flex-row items-center gap-2 md:flex-col md:items-start md:gap-0">
              <div className="font-medium">{item.title}</div>
              <div className="hidden text-gray-600 md:block">
                {item.longitude}, {item.latitude}
              </div>
              <div className="block md:hidden">{item.assets.length}</div>
            </div>
          </div>
        </div>
      </td>
      <td className="hidden whitespace-nowrap border-b p-4 md:table-cell md:px-6">
        {item.assets.length}
      </td>
    </>
  );
};
