# CardSkeleton Component Documentation

## Overview

The `CardSkeleton` component is a skeleton loader that mimics the layout of the real `Card` component. It maintains the same grid layout and dimensions, providing a smooth loading experience while data is being fetched.

## Features

- ✅ Matches exact layout of real Card component
- ✅ Maintains responsive grid (1 col → 2 cols → 3 cols → 4 cols)
- ✅ Smooth pulse animation
- ✅ Full dark mode support
- ✅ Proper spacing and padding consistency
- ✅ Professional skeleton appearance with gradient effect

## Component Structure

```jsx
<CardSkeleton index={0} />
```

### Props

- **index** (number) - Optional. The index of the skeleton in the list (for staggered animations)

## File Location

`src/components/Home/CardSkeleton.jsx`

## Usage Example

### Basic Implementation (OurProducts)

```jsx
import CardSkeleton from "./CardSkeleton";

const OurProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return result.data;
    },
  });

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3BADCD] mt-8">
        Our Products
      </h2>

      {isLoading ? (
        // Show skeleton loaders while loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} index={index} />
          ))}
        </div>
      ) : products && products.length > 0 ? (
        // Show real cards once loaded
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {products.map((product, index) => (
            <Card key={product._id} product={product} index={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
```

### AllProducts Page Implementation

```jsx
import CardSkeleton from "@/components/Home/CardSkeleton";

const AllProducts = () => {
  const { data, isLoading } = useQuery({
    // ... query config
  });

  if (isLoading) {
    return (
      <Container>
        <div className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#3BADCD] mt-8">
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-2 md:px-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} index={index} />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  return (
    // ... rest of component
  );
};
```

## Skeleton Layout Breakdown

The skeleton loader includes:

1. **Container** - Matches Card's gradient border and padding

   - Same responsive basis (full, 1/2, 1/3, 1/4)
   - Same border styling and shadow effects

2. **Image Area** - 4:3 aspect ratio

   - Gradient pulse animation
   - Rounded corners matching real cards

3. **Title Skeleton** - 1 line

   - Same height and width as real title

4. **Description Skeleton** - 3 lines

   - Progressive width (full → 5/6 → 4/5)
   - Matches real description text height

5. **Footer Skeleton** - 2 elements
   - Status badge placeholder
   - Action button placeholder

## Styling Details

### Grid Layout

- Mobile: 1 column (basis-full)
- Tablet: 2 columns (sm:basis-1/2)
- Medium: 3 columns (md:basis-1/3)
- Large: 4 columns (xl:basis-1/4)
- Gap: 8px (gap-8)

### Colors

- Light mode: slate-200, slate-300
- Dark mode: slate-700, slate-600
- Background: Matches page theme

### Animation

- Pulse effect: `animate-pulse`
- Duration: Default Tailwind pulse (2s)
- Smooth and non-intrusive

## Dark Mode Support

The skeleton automatically adapts to dark mode:

```jsx
// Light mode
bg-slate-200 dark:bg-slate-700

// Dark mode variant
dark:from-slate-700 dark:via-slate-600 dark:to-slate-700
```

## Performance Considerations

1. **Skeleton Count**: Typically show 8 skeletons (2 rows on desktop, 1 row on mobile)
2. **Animation**: Pulse animation is GPU-accelerated and lightweight
3. **Memory**: Skeletons are immediately replaced when data loads

## Integration Checklist

- [x] Import CardSkeleton component
- [x] Add to grid during loading state
- [x] Use Array.from({ length: 8 }) for 8 skeletons
- [x] Maintain same grid classes as real cards
- [x] Apply index prop for staggered animation effect

## Common Patterns

### Pagination Loading

```jsx
{isLoading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
    {Array.from({ length: pageSize }).map((_, i) => (
      <CardSkeleton key={i} index={i} />
    ))}
  </div>
) : (
  // Show real cards
)}
```

### Search Results Loading

```jsx
{isLoading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
    {Array.from({ length: 12 }).map((_, i) => (
      <CardSkeleton key={i} index={i} />
    ))}
  </div>
) : (
  // Show filtered results
)}
```

## Files Updated

- ✅ `/src/components/Home/CardSkeleton.jsx` - Created skeleton component
- ✅ `/src/components/Home/OurProducts.jsx` - Implemented skeleton usage
- ✅ `/src/pages/AllProducts.jsx` - Implemented skeleton usage with pagination

## Visual Comparison

### Before (LoadingSpinner)

- Generic spinner in center
- Lost grid layout context
- No indication of content shape

### After (CardSkeleton)

- Maintains exact card grid layout
- Shows users what content will look like
- Professional, modern loading experience
- Better perceived performance
