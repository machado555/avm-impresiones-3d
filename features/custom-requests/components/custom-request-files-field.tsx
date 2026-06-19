export function CustomRequestFilesField() {
  return (
    <div className="rounded-[8px] border border-dashed border-cyan-300/35 bg-cyan-300/5 p-6 text-center text-sm text-slate-300">
      <input
        className="w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
        name="files"
        type="file"
        multiple
        accept=".stl,.obj,.3mf,.jpg,.jpeg,.png,.zip"
      />
      <p className="mt-3 text-xs text-slate-500">STL, OBJ, 3MF, JPG, PNG o ZIP.</p>
    </div>
  );
}
